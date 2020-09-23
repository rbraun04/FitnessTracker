const db = require("../models");

module.exports = function (app) {

    //router put?
    app.put("/api/workouts/:id", (req, res) => {
        
        db.Workout.findOneAndUpdate(
            {_id: req.params.id},
            { $inc: {totalDuration: req.body.duration},
            // upsert:true, useFindeandModify:false
                $push: {exercises: req.body}
            },
            { new: true }).then(dbWorkout => {
                //console.log(dbWorkout)
                res.json(dbWorkout);
            }).catch(err => {
                res.json(err);
            });
        
    });

    app.get ("/api/workouts", (req, res) => {
        
        db.Workout.find({}).then(dbWorkout => {
            //db.Workout.find({}??
            dbWorkout.forEach(workout => {
                var total = 0;
                workout.exercises.forEach(e => {
                    total += e.duraction;
                });
                workout.totalDuration = total;
                //console.log(total)
            });

            res.json(dbWorkout);
            //console.log(dbWorkout)
        }).catch(err => {
            res.json(err);
        });
    });

    app.get("/api/workouts/range", (req,res) => {
        db.Workout.find({}).then(dbWorkout => {
            res.json(dbWorkout);
        }).catch(err => {
            res.json(err);
        });

    });

    app.post("/api/workouts", ({ body}, res) => {
        //db.Workout.create({}).then(newWorkout => {
            // res.json(newWorkout);
       // })
        db.Workout.create(body).then((dbWorkout => {
            res.json(dbWorkout);
        })).catch(err => {
            res.json(err);
        });
    });


}