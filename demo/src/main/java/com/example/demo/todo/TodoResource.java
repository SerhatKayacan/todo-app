package com.example.demo.todo;
import java.net.URI;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.example.demo.todo.Todo;

@RestController
@CrossOrigin(origins="http://localhost:4200")
public class TodoResource {
	
	@Autowired
	private TodoHardcodedService todoService;
	

	//http://localhost:8080/users/{username}/todos'a GET isteği 
	//(usename değişken, onu parametre olarak kullanabiliriz ama kullanmıyoruz tüm todoları dönüyoruz)
	@GetMapping("/users/{username}/todos")
	public List<Todo> getAllTodos(@PathVariable String username){
		return todoService.findAll(); // return all todos
	}
	
	@GetMapping("/users/{username}/todos/{id}")
	public Todo getTodo(@PathVariable String username, @PathVariable long id){
		return todoService.findById(id); // findbyId and return that todo
	}
	
	//http://localhost:8080'e DELETE isteği
	@DeleteMapping("/users/{username}/todos/{id}")
	public ResponseEntity<Void> deleteTodo(@PathVariable String username, @PathVariable long id){
		Todo todo=todoService.deleteById(id);
		if(todo!=null){
			return ResponseEntity.noContent().build();//success
		}
		return ResponseEntity.notFound().build();//fail
	}
	
	@PutMapping("/users/{username}/todos/{id}")//update a todo
	public ResponseEntity<Todo> updateTodo(
			@PathVariable String username, 
			@PathVariable long id,@RequestBody Todo todo){
		Todo todoUpdated=todoService.save(todo);
		return new ResponseEntity<Todo>(todo,HttpStatus.OK);
	}
	
	@PostMapping("/users/{username}/todos")//create a new todo
	public ResponseEntity<Void> updateTodo(
			@PathVariable String username, 
			@RequestBody Todo todo){
		Todo createdTodo=todoService.save(todo);
		//Get current resourse url
		// {id}
		URI uri=ServletUriComponentsBuilder.fromCurrentRequest()
				.path("/{id}").buildAndExpand(createdTodo.getId()).toUri();
		return ResponseEntity.created(uri).build();//return uri of created resource
	}
}
