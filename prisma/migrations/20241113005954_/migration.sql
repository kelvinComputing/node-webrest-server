-- CreateTable
CREATE TABLE "todo" (
    "id" SERIAL NOT NULL,
    "text" VARCHAR NOT NULL,
    "completeAdt" TIMESTAMP,

    CONSTRAINT "todo_pkey" PRIMARY KEY ("id")
);
