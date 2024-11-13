import { Request, Response } from "express";
import { prisma } from "../../data/postgres";
import { CreateTodoDto, UpdateTodoDto } from "../../domain/dtos";

// BD en memoria
// const todos = [
//     { id: 1, text: 'Buy milk', createdAt: new Date() },
//     { id: 2, text: 'Buy bread', createdAt: null},
//     { id: 3, text: 'Buy butter', createdAt: new Date() },
// ];


export class TodosController {

    //* DI
    constuctor() {}

    public getTodos = async (req: Request, res: Response) => {
        const todos = await prisma.todo.findMany();
        res.json( todos )
        
        // BD memoria
        // res.json(todos);
    }

    public getTodoById = async (req: Request, res: Response) => {
        const id = +req.params.id;
        if ( isNaN(id) ) res.status(400).json({ error: 'ID argument is not a mumber'})

        const todo = await prisma.todo.findFirst({
            where: { id }
        });

        // BD memoria
        // const todo = todos.find( todo => todo.id === id);

        ( todo )
         ? res.json(todo)
         : res.status(404).json({error: `TODO WITH ID ${ id } not found`})
    }

    public createTodo = async(req: Request, res: Response) => {
        const [error, createTodoDto]  = CreateTodoDto.create(req.body); 
        if ( error ) res.status(400).json({ error})

        // sin el DTO
        // const { text } = req.body;
        // if ( !text ) res.status(400).json({ error: 'Text property is requiered '});
        // const todo = await prisma.todo.create({
        //     data: { text }
        // });

        const todo = await prisma.todo.create({
            data: createTodoDto! 
        });

        res.json( todo );

        // Forma Anterior BD en memoria
        // const newTodo = {
        //     id: todos.length + 1,
        //     text: text,
        //     createdAt: null
        // }
        // todos.push(newTodo);
        // res.json( newTodo );
    }

    public updateTodo = async (req: Request, res: Response ) => {
        
        const id = +req.params.id;
        //Sin el DTO
        // if ( isNaN(id) ) res.status(400).json({ error: 'ID argument is not a mumber'})
        const [error, updateTodoDto] = UpdateTodoDto.create({...req.body, id});
        if ( error ) res.status(400).json({ error });

        const todo = await prisma.todo.findFirst({
            where: { id }
        });
        
        // BD memoria
        // const todo:any = todos.find( todo => todo.id === id);
        // todo.text = text || todo.text;
        // ( createdAt === 'null' )
        //     ? todo.createdAt = null
        //     : todo.createdAt = new Date( createdAt || todo.createdAt )
        // res.json( todo );

        if ( !todo ) res.status( 404 ).json({ error: `Todo with id ${ id } not found` })

        // Sin el DTO
        // const { text, completeAdt } = req.body;
        // const updateTodo = await prisma.todo.update({
        //     where: {id},
        //     data: { 
        //         text, 
        //         completeAdt: (completeAdt) ? new Date(completeAdt): null
        //     }
        // })

        const updateTodo = await prisma.todo.update({
            where: {id},
            data: updateTodoDto!.values
        });

        res.json( updateTodo );

        //! OJO referencia
        // todos.forEach((todo, index) => {
        //     if ( todo.id === id) {
        //         todos [index] = todo;
        //     }
        // })
    }

    public deleteTodo = async (req: Request, res: Response) => {
        
        
        const id = +req.params.id;

        const todo = await prisma.todo.findFirst({
            where: { id }
        });

        // BD memoria
        // const todo: any = todos.find( todo => todo.id === id);
        // todos.splice( todos.indexOf(todo), 1);

        if( !todo ) res.status(404).json({ error: `Todo with id ${ id } not found`})

        const deleted = await prisma.todo.delete({
            where: { id }
        });

        ( deleted )
          ? res.json(deleted)
          : res.status(400).json({ error: `Todo with id ${ id } not found`}) ;  
    }
}