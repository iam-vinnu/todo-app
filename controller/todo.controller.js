import { Todo } from "../model/todo.model.js";

export class TodoController {
    static async createTodo(req, res) {
        try {
            const { title, description } = req.body;
            if (!title || !description) {
                return res.status(400).json({ message: "All fields need to complete" })
            }

            const todo = new Todo({ title, description });
            await todo.save();

            return res.status(201).json({
                success: true,
                message: "Todo Created Successfully",
                todo
            })
        } catch (error) {
            console.error("Create Todo Error:", error.message);
            return res.status(500).json({
                success: false,
                message: "Can't create todo"
            })
        }
    }

    static async getAllTodos (req,res){
        try {
            const todos = await Todo.find();
            if(!todos) return res.status(400).json({message:"No todo found"});

            return res.status(200).json({
                todos
            })
        } catch (error) {
             console.error("Fetch Todo Error:", error.message);
            return res.status(500).json({
                success: false,
                message: "Can't Fetch"
            })
        }
    }

    static async updateTodo (req,res){
        try {
            const todoId = req.params.todoId;
            const {title , description} = req.body;
            const updateTodo = {title , description};

            if(title) updateTodo.title = title;
            if(description) updateTodo.description = description;

            const todo = await Todo.findByIdAndUpdate(todoId , updateTodo , {new:true});
            if(!todo) return res.status(400).json({message:"Todo not found"});

            return res.status(200).json({todo});
        } catch (error) {
             console.error("update Todo Error:", error.message);
            return res.status(500).json({
                success: false,
                message: "Can't update"
            })
        }
    }

    static async deleteTodo (req,res){
        try {
            const todoId = req.params.todoId;
            await Todo.findByIdAndDelete(todoId);


            return res.status(200).json({
                message:"Todo Successfully Deleted"
            })
        } catch (error) {
            console.error("Fetch Todo Error:", error.message);
            return res.status(500).json({
                success: false,
                message: "Can't delete"
            })
        }
    }
}