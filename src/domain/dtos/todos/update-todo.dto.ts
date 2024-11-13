
export class UpdateTodoDto {

    private constructor(
        public readonly id: number,
        public readonly text?: string,
        public readonly completeAdt?: Date,
    ){}

    get values() {
        const returnObj: {[key:string]:any} = {};

        if ( this.text ) returnObj.text = this.text;
        if ( this.completeAdt ) returnObj.completeAdt = this.completeAdt;

        return returnObj;
    }

    static create( props:{[ key:string ]:any} ): [string?, UpdateTodoDto?]{

        const { id, text, completeAdt} = props;
        let newCompletedAt = completeAdt;

        if ( !id || isNaN( Number(id)) ) {
            return ['id must be a valid number'];
        }

        if ( completeAdt ) {
            newCompletedAt = new Date(completeAdt)
            if ( newCompletedAt.toString() === 'Invalid Date'){
                return ['CompleAdt must be a valid date']
            }
        }

        return [undefined, new UpdateTodoDto(id, text, newCompletedAt)];
    }
}