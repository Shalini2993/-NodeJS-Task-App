const express = require('express')
const router = new express.Router()
const auth = require('../middleware/auth')
const Task = require('../models/task')

router.post('/tasks', auth, async (req, res) => {
    // const task = new Task(req.body)
    const task = new Task({
        ...req.body,
        owner: req.user._id
    })
    try {
        await task.save()
        res.status(201).send(task)
    } catch (e) {
        res.status(400).send(e)
    }
})

//GET /tasks?
router.get('/tasks', auth, async (req, res) => {
    try {
        const limit = parseInt(req.query.limit) //pagination limit
        const skip = parseInt(req.query.skip) //how many data to skip
        let tasks = await Task.find({ owner: req.user._id, ...(req.query.completed ? { completed: req.query.completed === "true" } : {}) })
        if (skip && limit) {
            tasks = tasks.slice(skip, limit)
        }
        // sorting not working
        if (req.query.sort) {
            tasks.sort((task1, task2) => req.query.sort.toLowerCase() === "asc" ? task1.createdAt - task2.createdAt : task2.createdAt - task1.createdAt)
        }
        res.send(tasks)
        //=============================not working===============================
        // console.log(req.user)
        // await req.user.populate({
        //     path: 'tasks',
        //     match,
        //     options: {
        //          limit,
        //          skip,
        //          sort: {
        //              createdAt: 1
        //}
        // }
        // }).execPopulate()
        // console.log(req.user)
        // res.send(req.user.tasks)

    } catch (e) {
        res.status(500).send()
    }
})

router.get('/tasks/:id', auth, async (req, res) => {
    const _id = req.params.id
    try {
        // const task = await Task.findById(_id)
        const task = await Task.findOne({ _id, owner: req.user._id })
        if (!task) {
            res.status(404).send()
        }
        res.send(task)
    } catch (e) {
        res.status(500).send()
    }
})

router.patch('/tasks/:id', auth, async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['desc', 'completed']
    const isValidOperation = updates.every(update => allowedUpdates.includes(update))

    if (!isValidOperation) {
        return res.status(400).send({ error: 'invalid updates' })
    }
    const _id = req.params.id
    try {
        const task = await Task.findOne({ _id: req.params.id, owner: req.user._id })
        //const task = await Task.findByIdAndUpdate(_id)

        //const task = await Task.findByIdAndUpdate(_id, req.body, { new: true, runValidators: true })
        if (!task) {
            res.status(404).send()
        }
        updates.forEach((update) => task[update] = req.body[update])
        await task.save()
        res.send(task)
    } catch (e) {
        res.status(400).send()
    }
})

router.delete('/tasks/:id', auth, async (req, res) => {
    try {
        const task = await Task.findOneAndDelete({ _id: req.params.id, owner: req.user._id })
        if (!task) {
            return res.status(404).send()
        }
        res.send(task)
    } catch (e) {
        res.send(500).send()
    }
})

module.exports = router
