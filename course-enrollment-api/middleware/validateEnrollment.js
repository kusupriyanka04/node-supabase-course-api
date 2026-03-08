const validateEnrollment = (req, res, next) => {
    const { student_name, course_id } = req.body;

    if(!student_name || student_name.trim() === ''){
        return res.status(400).json({
            error: 'Bad Request',
            message: 'Student_name is required and cannot be empty.',
        });
    }

    if(course_id === undefine || course_id === null || course_id === ''){
        return res.status(400).json({
            error: 'Bad Request',
            message: 'course_id is required.',
        });
    }

    req.body.student_name = student_name.trim();
    req.body.course_id = course_id;

    next();
};