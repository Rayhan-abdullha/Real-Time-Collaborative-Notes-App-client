const person = {
    name: 'John Doe',
    age: 27, 
    greet: () => {
      console.log('Hello, my name is ' + this.name + ' and I am ' + this.age + ' years old.');
    }
}
console.log(person.name);
person.greet.call({ name: 'Alice', age: 30 });
  