class Animal {
    void eat() { System.out.println("Animal eats"); }
}

class Dog extends Animal {
    void bark() { System.out.println("Dog barks"); }
}

class Puppy extends Dog {
    void weep() { System.out.println("Puppy weeps"); }
}

class Cat extends Animal {
    void meow() { System.out.println("Cat meows"); }
}

public class InheritanceDemo {
    public static void main(String[] args) {
        Dog d = new Dog(); d.eat(); d.bark();
        Puppy p = new Puppy(); p.eat(); p.bark(); p.weep();
        Cat c = new Cat(); c.eat(); c.meow();
    }
}