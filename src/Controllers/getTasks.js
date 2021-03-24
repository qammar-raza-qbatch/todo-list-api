const Task = require('../Models/TaskModal');

exports.getTasks = (req, res, next) => {
  Task.find()
    .then((tasks) => {
      if (tasks.length > 0) {
        const tks = tasks.map((tk) => {
          return {
            quantity: tk.quantity,
            taskName: tk.taskName,
            subName: tk.subName,
            id: tk._id
          }
        })
        res.status(200).json({
          status: 'True',
          tasks: tks
        })
      }
    }).catch((err) => {
      res.status(422).json({
        status: 'False',
        message: 'Something Got Wrong'
      })
    })
}

exports.postTask = (req, res, next) => {
  const { customerName, customerQuantity, customerSubName } = req.body || {};
  Task.find({ taskName: customerName })
    .then((tasks) => {
      if (tasks.length == 0) {
        const newTask = new Task({
          taskName: customerName,
          quantity: customerQuantity,
          subName: customerSubName
        });
        newTask.save();
        return { stat: true, task: newTask }
      } else {
        const task = tasks.find(t => t.taskName == customerName);
        task.quantity = customerQuantity;
        task.subName = customerSubName
        task.save()
        return { stat: false, task }
      }
    }).then((result) => {
      if (result.stat) {
        res.status(200).json({
          message: 'saved successfull',
          status: 200,
          task: result.task
        })
      } else if (!result.stat) {
        res.status(204).json({
          status: 204,
          message: 'Already added with the same name',
          task: result.task
        })
      }
    })
    .catch((err) => {
      res.status(422).json({
        message: 'cant be saved'
      })
    })
}

exports.editTasks = (req, res, next) => {
  const { id, customerName, customerQuantity, customerSubName } = req.body || {}
  Task.findById(id)
    .then((task) => {
      if (task) {
        task.quantity = customerQuantity;
        task.subName = customerSubName;
        task.taskName = customerName;
        task.save();
        return { status: true, task }
      } else {
        return { status: false }
      }
    }).then((data) => {
      if (data.status == true) {
        res.status(200).json({
          message: 'Task Edit Successfull',
          success: data.status,
          task: data.task
        })
      } else {
        res.status(204).json({
          success: false,
          message: 'Task with the given id does not exist'
        })
      }
    })
    .catch((err) => {
      res.status(422).json({
        success: false,
        message: 'Task with the given id does not exist'
      })
    })
}

exports.deleteTask = (req, res, next) => {
  const { id } = req.body || {}
  Task.findByIdAndDelete(id)
    .then((task) => {
      if (task) {
        res.status(200).json({
          success: 'true',
          message: 'Task Deleted Successfully'
        })
      } else {
        res.status(422).json({
          success: 'false',
          message: 'No Task Found with the given id'
        })
      }
    }).catch((err) => {
      res.status(422).json({
        success: 'false',
        message: 'No Task Found with the given id'
      })
    })
}