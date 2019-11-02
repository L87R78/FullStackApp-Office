const router = require('express').Router();
let User = require('../models/users_models');

router.route('/').get((req, res) => {
    User.find()
        .then(users => res.json(users))
        .catch(err => res.status(400).json('Error: ' + err));
})

router.route('/add').post((req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    const exam = req.body.exam;
    const countCorrectAnswers = req.body.countCorrectAnswers;
    const stepQuastion = req.body.stepQuastion;
    const money = req.body.money;
    const myOrders = req.body.myOrders;

    const newUser = new User({ username, password, exam, countCorrectAnswers, stepQuastion, money, myOrders });

    newUser.save()
        .then(() => res.json('User added!'))
        .catch(err => res.status(400).json('Error: ' + err))
})
router.route('/update/:id').post((req, res) => {
    User.findById(req.params.id)
        .then(reg => {
            reg.username = req.body.username;
            reg.password = req.body.password;
            reg.exam = req.body.exam;
            reg.countCorrectAnswers = req.body.countCorrectAnswers;
            reg.stepQuastion = req.body.stepQuastion;
            reg.money = req.body.money;
            reg.myOrders = req.body.myOrders;

            reg.save()
                .then(() => res.json('User updated!'))
                .catch(err => res.status(400).json('Error: ' + err))
        })
        .catch(err => res.status(400).json('Error: ' + err))
});

module.exports = router;