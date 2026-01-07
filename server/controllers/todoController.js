import Todo from "../models/Todo.js";

//Get All Todos
export const getTodos = async (req, res ) => {
    try {
       const todos = await Todo.find().sort({createdAt: -1}); 
       res.json(todos);
    } catch (error) {
       res.status(500).json({message: error.message}); 
    }
};

//Create new todo
export const createTodo = async (req, res) => {
    try {
        const {title} = req.body;
        if(!title) {
            return res.status(400).jason({message: "Title is required!"});
        }
        const todo = await Todo.create({title});
        res.status(201).json(todo);
    } catch (error) {
       res.status(500).json({error: error.message}); 
    }
};

//Update todo
export const updateTodo = async (req, res) => {
  try {
    const todo = await Todo.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!todo) {
      return res.status(404).json({ message: "Todo not found" });
    }

    res.json(todo);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//Delete todo
export const deleteTodo = async (req, res) => {
  try {
    const todo = await Todo.findByIdAndDelete(req.params.id);

    if (!todo) {
      return res.status(404).json({ message: "Todo not found" });
    }

    res.json({ message: "Todo deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};