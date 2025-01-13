const mongoose = require("mongoose");

// Define the Tags schema
const categorySchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	description: { type: String },
	courses: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "Course",
		},
	],
});


const Category = mongoose.model("Category", categorySchema);

const seedCategories = async () => {
	const defaultCategories = [
		{
			name: "Programming",
			description: "Courses related to programming languages and frameworks.",
		},
		{
			name: "Data Science",
			description: "Courses related to data analysis, machine learning, and AI.",
		},
		{
			name: "Web Development",
			description: "Courses on building websites and web applications.",
		},
		{
			name: "Cybersecurity",
			description: "Courses focused on protecting systems and data from cyber threats.",
		},
	];

	for (const category of defaultCategories) {
		try {
			const existingCategory = await Category.findOne({ name: category.name });
			if (!existingCategory) {
				await Category.create(category);
				console.log(`Category '${category.name}' added to the database.`);
			} else {
				console.log(`Category '${category.name}' already exists.`);
			}
		} catch (error) {
			console.error(`Error adding category '${category.name}':`, error);
		}
	}
};

seedCategories();

module.exports = Category;