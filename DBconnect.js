const mongoose = require("mongoose");

module.exports = async () => {
	try {
		const mongoUri =
			"mongodb+srv://vishal1414:vA1PIkmGAGeeNp8y@cluster0.1phxpu5.mongodb.net/?retryWrites=true&w=majority";

		const mongoConnect = await mongoose.connect(
			mongoUri,
			{ useNewUrlParser: true, useUnifiedTopology: true },
			() => console.log(`Mongoose Connect: `)
		);
	} catch (e) {
		console.log(e);
		process.exist(1);
	}
};
