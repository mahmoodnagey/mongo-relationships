const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/playground')
  .then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.error('Could not connect to MongoDB...', err));

const authorSchema = new mongoose.Schema({
  name: String,
  bio: String,
  website: String
});

const Author = mongoose.model('Author', authorSchema);

const Course = mongoose.model('Course', new mongoose.Schema({
  name: String,
  author: authorSchema
}));

async function createCourse(name, author) {
  const course = new Course({
    name, 
    author
  }); 
  
  const result = await course.save();
  console.log(result);
}

async function listCourses() { 
  const courses = await Course.find();
  console.log(courses);
}

// if we need to update the embedded document, we only can do this through the main document
async function updateAuthor(courseId) {
    // const course = await Course.findById(courseId);
    // course.author.name = 'Mahmoud Nagy';
    // course.save();
    
    /*---- another way --*/
    const course = await Course.findByIdAndUpdate({_id: courseId}, {
        $set: {
            'author.name': 'Mahmoud Nagy'
        }
    });
}

// updateAuthor('6461fcb37f9ca0ab7123af09');

// createCourse('Node Course', new Author({ name: 'Mahmoud' }));
