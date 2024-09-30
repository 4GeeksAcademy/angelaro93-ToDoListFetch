import React from "react";

import ToDoList from "./todolist";

//create your first component
const Home = () => {
	return (
		<div className="text-center">
			<ToDoList/>
		</div>
	);
};

export default Home;