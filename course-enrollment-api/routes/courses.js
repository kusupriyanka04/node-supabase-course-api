const express = require("express");
const router = express.Router();
const supabase = require("../supabaseClient");
const validateEnrollment = require("../middleware/validateEnrollment");

router.get("/", async (req, res) => {
  try {
    const { data, error } = await supabase.from("courses").select("*");

    if(error) {
        console.log('Supabase error:', error.message);
        return res.status(500).json({
            error: 'Internal Server Error',
            message: error.message,
        });
    }
    return res.status(200).json(data);
  } catch (err) {
    console.log('Unexpected error:', err.message);
    return res.status(500).json({
         error: 'Internal Server Error',
            message: 'An unexpected error occurred.' ,
    });
  }
});

router.post('/enroll', validateEnrollment, async(req, res) => {
    const { student_name, course_id } = req.body;

    try {
        const {data: course, error: courseError } = await supabase.from('courses').select('id').eq('id', course_id).single();

        if(courseError || !course){
            return res.status(404).json({
                 error: 'Not Found',
                 message: `No course found with id: ${course_id}`
            });
        }

        const { data, error } = await supabase
        .from('enrollments')
        .insert([{ student_name, course_id }])
        .select();

        if(error) {
            console.log('supabase error:', error.message);
            return res.status(500).json({
                error: error.message,
            });
        }
        return res.status(201).json({
            message: 'Student enrolled successfully.',
            enrollment: data[0],
        })

    } catch (err) {
        console.log('Unexpected error:', err.message);
        return res.status(500).json({
            error: 'Internal Server Error',
            message: 'An unexpected error occurred.' ,
        });
    }
});

module.exports = router;
