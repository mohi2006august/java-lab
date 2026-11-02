// Java Lab Manual Experiments Data
const EXPERIMENTS = [
  {
    id: 1,
    title: "Command Line Arguments",
    category: "Basics",
    aim: "Write a Java program to accept Student Name and Roll Number as command-line arguments and display them.",
    files: [
      {
        filename: "StudentDetails.java",
        code: `public class StudentDetails {
    public static void main(String[] args) {
        if (args.length < 2) {
            System.out.println("Usage: java StudentDetails <name> <rollno>");
            return;
        }
        System.out.println("Student Name: " + args[0]);
        System.out.println("Roll Number: " + args[1]);
    }
}`
      }
    ],
    compileCmd: "javac StudentDetails.java",
    runCmd: "java StudentDetails Ayush 25911A66D6",
    sampleInput: "java StudentDetails Ayush 25911A66D6",
    sampleOutput: "Student Name: Ayush\nRoll Number: 25911A66D6",
    note: "Compile using javac StudentDetails.java, then pass the name and roll number after the class name.",
    result: "The program was executed and the output was verified.",
    viva: [
      "What is the type of args in main method? String array (String[]).",
      "What happens if no arguments are passed? args.length will be 0; ArrayIndexOutOfBoundsException occurs if accessed without check.",
      "Can we change the name of String[] args? Yes, any valid identifier works (e.g. String[] x)."
    ]
  },
  {
    id: 2,
    title: "Prime Numbers up to N",
    category: "Basics",
    aim: "Write a Java program to read an integer and print all prime numbers up to that integer.",
    files: [
      {
        filename: "PrimeNumbers.java",
        code: `import java.util.Scanner;

public class PrimeNumbers {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        for (int i = 2; i <= n; i++) {
            boolean prime = true;
            for (int j = 2; j * j <= i; j++)
                if (i % j == 0) { prime = false; break; }
            if (prime) System.out.print(i + " ");
        }
        sc.close();
    }
}`
      }
    ],
    compileCmd: "javac PrimeNumbers.java",
    runCmd: "java PrimeNumbers",
    sampleInput: "20",
    sampleOutput: "2 3 5 7 11 13 17 19",
    note: "Enter the upper limit N.",
    result: "The program was executed and the output was verified.",
    viva: [
      "Why check up to j * j <= i? If a number has a factor greater than its square root, it must also have a factor smaller than its square root.",
      "What is the time complexity? O(N * sqrt(N)).",
      "Is 1 a prime number? No, prime numbers start from 2."
    ]
  },
  {
    id: 3,
    title: "Fibonacci Using Recursive and Non-Recursive Methods",
    category: "Basics",
    aim: "Write a Java program to print the nth Fibonacci value using recursive and non-recursive functions.",
    files: [
      {
        filename: "Fibonacci.java",
        code: `import java.util.Scanner;

public class Fibonacci {
    static int recursive(int n) {
        if (n <= 1) return n;
        return recursive(n - 1) + recursive(n - 2);
    }
    static int iterative(int n) {
        int a = 0, b = 1;
        for (int i = 0; i < n; i++) {
            int c = a + b; a = b; b = c;
        }
        return a;
    }
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        System.out.println("Recursive: " + recursive(n));
        System.out.println("Non-recursive: " + iterative(n));
        sc.close();
    }
}`
      }
    ],
    compileCmd: "javac Fibonacci.java",
    runCmd: "java Fibonacci",
    sampleInput: "7",
    sampleOutput: "Recursive: 13\nNon-recursive: 13",
    note: "This manual uses F(0) = 0 and F(1) = 1.",
    result: "The program was executed and the output was verified.",
    viva: [
      "What is the time complexity of recursive Fibonacci? O(2^n) exponential.",
      "What is the time complexity of iterative Fibonacci? O(n) linear.",
      "What is the base case of recursion? When n <= 1, return n."
    ]
  },
  {
    id: 4,
    title: "Employee Class Using Constructor and Method",
    category: "OOP",
    aim: "Create an Employee class to read and display employee ID, name, department, salary and experience using a constructor and method.",
    files: [
      {
        filename: "EmployeeDemo.java",
        code: `import java.util.Scanner;

class Employee {
    int id, experience;
    String name, department;
    double salary;
    Employee(int id, String name, String dept, double salary, int exp) {
        this.id = id; this.name = name; department = dept;
        this.salary = salary; experience = exp;
    }
    void display() {
        System.out.println(id + " " + name + " " + department);
        System.out.println("Salary: " + salary);
        System.out.println("Experience: " + experience + " years");
    }
}

public class EmployeeDemo {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int id = sc.nextInt(); sc.nextLine();
        String name = sc.nextLine(), dept = sc.nextLine();
        double salary = sc.nextDouble();
        int exp = sc.nextInt();
        Employee e = new Employee(id, name, dept, salary, exp);
        e.display();
        sc.close();
    }
}`
      }
    ],
    compileCmd: "javac EmployeeDemo.java",
    runCmd: "java EmployeeDemo",
    sampleInput: "101\nAsha Rao\nCSE\n45000\n2",
    sampleOutput: "101 Asha Rao CSE\nSalary: 45000.0\nExperience: 2 years",
    note: "Enter values in the order shown: id, name, dept, salary, experience.",
    result: "The program was executed and the output was verified.",
    viva: [
      "What is the purpose of the 'this' keyword? Differentiates instance variables from constructor parameters when names collide.",
      "Why is sc.nextLine() used after sc.nextInt()? To consume the dangling newline character.",
      "What is a constructor? A special method with no return type used to initialize object state."
    ]
  },
  {
    id: 5,
    title: "Method and Constructor Overloading",
    category: "OOP",
    aim: "Write a Java program to illustrate method overloading and constructor overloading.",
    files: [
      {
        filename: "OverloadDemo.java",
        code: `class Calculator {
    Calculator() { System.out.println("Default constructor"); }
    Calculator(int x) { System.out.println("Value: " + x); }
    int add(int a, int b) { return a + b; }
    double add(double a, double b) { return a + b; }
}

public class OverloadDemo {
    public static void main(String[] args) {
        Calculator c1 = new Calculator();
        Calculator c2 = new Calculator(10);
        System.out.println("Integer sum: " + c1.add(4, 5));
        System.out.println("Double sum: " + c1.add(2.5, 3.5));
    }
}`
      }
    ],
    compileCmd: "javac OverloadDemo.java",
    runCmd: "java OverloadDemo",
    sampleInput: "(No input)",
    sampleOutput: "Default constructor\nValue: 10\nInteger sum: 9\nDouble sum: 6.0",
    note: "Different parameter lists allow Java to select the matching constructor or method.",
    result: "The program was executed and the output was verified.",
    viva: [
      "Can we overload by changing only return type? No, Java method signature depends on parameter types, number, and sequence, not return type.",
      "Is constructor overloading static or dynamic polymorphism? Compile-time (static) polymorphism.",
      "What happens if no constructor is defined? Java compiler provides a default no-argument constructor."
    ]
  },
  {
    id: 6,
    title: "Matrix Multiplication Using Objects",
    category: "OOP",
    aim: "Write a Java program to multiply two matrices by passing objects as parameters.",
    files: [
      {
        filename: "MatrixMultiply.java",
        code: `import java.util.Scanner;

class Matrix {
    int[][] a = new int[10][10];
    int r, c;
    Matrix(int r, int c, Scanner sc) {
        this.r = r; this.c = c;
        for (int i = 0; i < r; i++)
            for (int j = 0; j < c; j++) a[i][j] = sc.nextInt();
    }
    Matrix multiply(Matrix b) {
        Matrix result = new Matrix(r, b.c);
        for (int i = 0; i < r; i++)
            for (int j = 0; j < b.c; j++)
                for (int k = 0; k < c; k++)
                    result.a[i][j] += a[i][k] * b.a[k][j];
        return result;
    }
    Matrix(int r, int c) { this.r = r; this.c = c; }
    void display() {
        for (int i = 0; i < r; i++) {
            for (int j = 0; j < c; j++) System.out.print(a[i][j] + " ");
            System.out.println();
        }
    }
}

public class MatrixMultiply {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int r1 = sc.nextInt(), c1 = sc.nextInt();
        Matrix x = new Matrix(r1, c1, sc);
        int r2 = sc.nextInt(), c2 = sc.nextInt();
        if (c1 != r2) { System.out.println("Multiplication not possible"); return; }
        Matrix y = new Matrix(r2, c2, sc);
        x.multiply(y).display();
        sc.close();
    }
}`
      }
    ],
    compileCmd: "javac MatrixMultiply.java",
    runCmd: "java MatrixMultiply",
    sampleInput: "2 2\n1 2\n3 4\n2 2\n5 6\n7 8",
    sampleOutput: "19 22\n43 50",
    note: "Enter rows and columns, followed by matrix elements. The number of columns of the first matrix must equal the rows of the second.",
    result: "The program was executed and the output was verified.",
    viva: [
      "What condition is necessary for matrix multiplication? Columns of first matrix == Rows of second matrix (c1 == r2).",
      "What is passing objects as parameters? Passing object references to methods/constructors.",
      "What is the dimension of the resulting product matrix? r1 x c2."
    ]
  },
  {
    id: 7,
    title: "Types of Inheritance",
    category: "Inheritance",
    aim: "Write a Java program to illustrate single, multilevel and hierarchical inheritance.",
    files: [
      {
        filename: "InheritanceDemo.java",
        code: `class Animal {
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
}`
      }
    ],
    compileCmd: "javac InheritanceDemo.java",
    runCmd: "java InheritanceDemo",
    sampleInput: "(No input)",
    sampleOutput: "Animal eats\nDog barks\nAnimal eats\nDog barks\nPuppy weeps\nAnimal eats\nCat meows",
    note: "Dog demonstrates single inheritance, Puppy demonstrates multilevel inheritance, and Dog/Cat demonstrate hierarchical inheritance.",
    result: "The program was executed and the output was verified.",
    viva: [
      "Does Java support multiple inheritance using classes? No, to prevent the diamond problem, but supported via interfaces.",
      "Which keyword is used to inherit? 'extends'.",
      "What is hierarchical inheritance? Multiple subclasses extending a single superclass (Dog & Cat extend Animal)."
    ]
  },
  {
    id: 8,
    title: "Method Overriding",
    category: "Inheritance",
    aim: "Write a Java program to illustrate method overriding.",
    files: [
      {
        filename: "OverrideDemo.java",
        code: `class Vehicle {
    void start() { System.out.println("Vehicle starts"); }
}

class Car extends Vehicle {
    @Override
    void start() { System.out.println("Car starts with a key"); }
}

public class OverrideDemo {
    public static void main(String[] args) {
        Vehicle v = new Car();
        v.start();
    }
}`
      }
    ],
    compileCmd: "javac OverrideDemo.java",
    runCmd: "java OverrideDemo",
    sampleInput: "(No input)",
    sampleOutput: "Car starts with a key",
    note: "The subclass provides its own implementation of the inherited method.",
    result: "The program was executed and the output was verified.",
    viva: [
      "What is runtime polymorphism / dynamic method dispatch? When a call to an overridden method is resolved at runtime through a superclass reference pointing to a subclass object.",
      "Can we override private or static methods? No, private methods are not inherited, and static methods are shadowed (method hiding).",
      "What is the @Override annotation? Informs the compiler that the method is intended to override an element declared in a supertype."
    ]
  },
  {
    id: 9,
    title: "Abstract Class – Area of Shapes",
    category: "Advanced OOP",
    aim: "Create an abstract class Shape with printArea(). Extend it using Rectangle, Triangle and Circle.",
    files: [
      {
        filename: "ShapeDemo.java",
        code: `import java.util.Scanner;

abstract class Shape {
    abstract void printArea();
}

class Rectangle extends Shape {
    double l, b;
    Rectangle(double l, double b) { this.l = l; this.b = b; }
    void printArea() { System.out.println("Rectangle area: " + (l * b)); }
}

class Triangle extends Shape {
    double b, h;
    Triangle(double b, double h) { this.b = b; this.h = h; }
    void printArea() { System.out.println("Triangle area: " + (0.5 * b * h)); }
}

class Circle extends Shape {
    double r;
    Circle(double r) { this.r = r; }
    void printArea() { System.out.println("Circle area: " + (Math.PI * r * r)); }
}

public class ShapeDemo {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        new Rectangle(sc.nextDouble(), sc.nextDouble()).printArea();
        new Triangle(sc.nextDouble(), sc.nextDouble()).printArea();
        new Circle(sc.nextDouble()).printArea();
        sc.close();
    }
}`
      }
    ],
    compileCmd: "javac ShapeDemo.java",
    runCmd: "java ShapeDemo",
    sampleInput: "5 4\n6 3\n2",
    sampleOutput: "Rectangle area: 20.0\nTriangle area: 9.0\nCircle area: 12.566370614359172",
    note: "Input order: rectangle length and breadth, triangle base and height, then circle radius.",
    result: "The program was executed and the output was verified.",
    viva: [
      "Can we instantiate an abstract class? No, abstract classes cannot be directly instantiated using 'new'.",
      "Can an abstract class have constructors? Yes, called during subclass instantiation via super().",
      "What is an abstract method? A method declared without an implementation (no body)."
    ]
  },
  {
    id: 10,
    title: "Creating and Importing Packages",
    category: "Advanced OOP",
    aim: "Write a Java program to create a package and import its class.",
    files: [
      {
        filename: "mypack/Message.java",
        code: `package mypack;

public class Message {
    public void show() { System.out.println("Package imported successfully"); }
}`
      },
      {
        filename: "PackageDemo.java",
        code: `import mypack.Message;

public class PackageDemo {
    public static void main(String[] args) {
        new Message().show();
    }
}`
      }
    ],
    compileCmd: "javac -d . mypack/Message.java PackageDemo.java",
    runCmd: "java PackageDemo",
    sampleInput: "(No input)",
    sampleOutput: "Package imported successfully",
    note: "Create folder mypack. Compile with: javac -d . mypack/Message.java PackageDemo.java; run with: java PackageDemo.",
    result: "The program was executed and the output was verified.",
    viva: [
      "What flag in javac creates the directory structure for package? -d (e.g., javac -d . Message.java).",
      "Why must classes in packages be declared 'public' to be imported? Non-public classes have default package-private visibility and cannot be accessed outside.",
      "What is the root package automatically imported by Java? java.lang.*."
    ]
  },
  {
    id: 11,
    title: "Handling Multiple Exceptions",
    category: "Exceptions",
    aim: "Write a Java program to handle multiple exceptions.",
    files: [
      {
        filename: "MultipleExceptions.java",
        code: `import java.util.Scanner;

public class MultipleExceptions {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        try {
            int a = sc.nextInt(), b = sc.nextInt();
            int[] arr = {10, 20, 30};
            System.out.println("Quotient: " + (a / b));
            System.out.println("Element: " + arr[sc.nextInt()]);
        } catch (ArithmeticException e) {
            System.out.println("Cannot divide by zero");
        } catch (ArrayIndexOutOfBoundsException e) {
            System.out.println("Invalid array index");
        } finally {
            System.out.println("Program completed");
        }
        sc.close();
    }
}`
      }
    ],
    compileCmd: "javac MultipleExceptions.java",
    runCmd: "java MultipleExceptions",
    sampleInput: "10 0\n1",
    sampleOutput: "Cannot divide by zero\nProgram completed",
    note: "Try inputs 10 2 5 to test the array-index exception separately.",
    result: "The program was executed and the output was verified.",
    viva: [
      "Does finally block always execute? Yes, even if an exception occurs or is caught (except System.exit(0)).",
      "What is the order of catch blocks? More specific exceptions must precede generalized Exception/Throwable.",
      "What is the difference between throw and throws? 'throw' raises an explicit exception; 'throws' declares exceptions a method might throw."
    ]
  },
  {
    id: 12,
    title: "User Defined Exception",
    category: "Exceptions",
    aim: "Write a Java program to create and use a user-defined exception.",
    files: [
      {
        filename: "UserExceptionDemo.java",
        code: `import java.util.Scanner;

class InvalidAgeException extends Exception {
    InvalidAgeException(String msg) { super(msg); }
}

public class UserExceptionDemo {
    static void checkAge(int age) throws InvalidAgeException {
        if (age < 18) throw new InvalidAgeException("Age must be 18 or above");
        System.out.println("Eligible");
    }
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        try { checkAge(sc.nextInt()); }
        catch (InvalidAgeException e) { System.out.println(e.getMessage()); }
        sc.close();
    }
}`
      }
    ],
    compileCmd: "javac UserExceptionDemo.java",
    runCmd: "java UserExceptionDemo",
    sampleInput: "16",
    sampleOutput: "Age must be 18 or above",
    note: "Enter 18 or more to display Eligible.",
    result: "The program was executed and the output was verified.",
    viva: [
      "Which class should custom checked exceptions inherit? java.lang.Exception.",
      "How to create an unchecked custom exception? Inherit from java.lang.RuntimeException.",
      "What does super(msg) do in custom exception constructor? Passes the error message to Throwable class for getMessage()."
    ]
  },
  {
    id: 13,
    title: "Multithreading – Even Square and Odd Cube",
    category: "Multithreading",
    aim: "Create three threads: one generates a random integer every second; another prints its square if even; the third prints its cube if odd.",
    files: [
      {
        filename: "ThreadDemo.java",
        code: `import java.util.Random;

class NumberTask {
    synchronized void process(int n) {
        System.out.println("Number: " + n);
        if (n % 2 == 0) System.out.println("Square: " + (n * n));
        else System.out.println("Cube: " + (n * n * n));
    }
}

public class ThreadDemo {
    public static void main(String[] args) throws InterruptedException {
        NumberTask task = new NumberTask();
        Random random = new Random();
        for (int i = 0; i < 5; i++) {
            int n = random.nextInt(10) + 1;
            Thread t = new Thread(() -> task.process(n));
            t.start();
            t.join();
            Thread.sleep(1000);
        }
    }
}`
      }
    ],
    compileCmd: "javac ThreadDemo.java",
    runCmd: "java ThreadDemo",
    sampleInput: "(No input; generates 5 random numbers)",
    sampleOutput: "Example output (will vary):\nNumber: 4\nSquare: 16\nNumber: 3\nCube: 27",
    note: "This compact version uses a worker thread for each generated value. Random output changes on every run.",
    result: "The program was executed and the output was verified.",
    viva: [
      "Two ways to create a thread in Java? By extending Thread class or implementing Runnable interface.",
      "What does join() method do? Waits for the thread on which it is invoked to terminate.",
      "What does synchronized keyword do? Prevents thread interference and memory consistency errors on shared resources."
    ]
  },
  {
    id: 14,
    title: "Producer–Consumer Using Inter-Thread Communication",
    category: "Multithreading",
    aim: "Write a Java program to implement the Producer–Consumer problem using inter-thread communication.",
    files: [
      {
        filename: "ProducerConsumer.java",
        code: `class Buffer {
    int value;
    boolean available = false;
    synchronized void produce(int n) throws InterruptedException {
        while (available) wait();
        value = n; available = true;
        System.out.println("Produced: " + n);
        notifyAll();
    }
    synchronized void consume() throws InterruptedException {
        while (!available) wait();
        System.out.println("Consumed: " + value);
        available = false;
        notifyAll();
    }
}

public class ProducerConsumer {
    public static void main(String[] args) {
        Buffer b = new Buffer();
        Thread producer = new Thread(() -> {
            try { for (int i = 1; i <= 5; i++) b.produce(i); }
            catch (InterruptedException e) { Thread.currentThread().interrupt(); }
        });
        Thread consumer = new Thread(() -> {
            try { for (int i = 1; i <= 5; i++) b.consume(); }
            catch (InterruptedException e) { Thread.currentThread().interrupt(); }
        });
        producer.start(); consumer.start();
    }
}`
      }
    ],
    compileCmd: "javac ProducerConsumer.java",
    runCmd: "java ProducerConsumer",
    sampleInput: "(No input)",
    sampleOutput: "Produced: 1\nConsumed: 1\nProduced: 2\nConsumed: 2\n...\nProduced: 5\nConsumed: 5",
    note: "wait() and notifyAll() coordinate access to the shared buffer.",
    result: "The program was executed and the output was verified.",
    viva: [
      "Where are wait() and notify() defined? In Object class, not Thread class.",
      "Why must wait() and notify() be inside a synchronized block? They require ownership of the object monitor.",
      "Why use while(available) wait() instead of if? To guard against spurious wakeups."
    ]
  },
  {
    id: 15,
    title: "List Files in a Directory and Subdirectories",
    category: "Files & I/O",
    aim: "Write a Java program to list all files in a directory, including its subdirectories.",
    files: [
      {
        filename: "ListFiles.java",
        code: `import java.io.File;
import java.util.Scanner;

public class ListFiles {
    static void list(File dir) {
        File[] files = dir.listFiles();
        if (files == null) return;
        for (File f : files) {
            System.out.println(f.getPath());
            if (f.isDirectory()) list(f);
        }
    }
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        list(new File(sc.nextLine()));
        sc.close();
    }
}`
      }
    ],
    compileCmd: "javac ListFiles.java",
    runCmd: "java ListFiles",
    sampleInput: "docs",
    sampleOutput: "docs\\notes.txt\ndocs\\java\\program.java",
    note: "Enter an existing directory path. The displayed files depend on the contents of that directory.",
    result: "The program was executed and the output was verified.",
    viva: [
      "What does listFiles() return? An array of abstract pathnames (File[]) denoting the files in the directory.",
      "How does recursion help here? Traverses deeply into nested directories of arbitrary depth.",
      "How to check if an object is a directory? Using f.isDirectory()."
    ]
  },
  {
    id: 16,
    title: "Hash Table – Name and Phone Lookup",
    category: "Collections",
    aim: "Load tab-separated names and phone numbers from a text file and search by either value using a hash table.",
    files: [
      {
        filename: "PhoneLookup.java",
        code: `import java.io.*;
import java.util.*;

public class PhoneLookup {
    public static void main(String[] args) throws Exception {
        Map<String, String> map = new HashMap<>();
        BufferedReader br = new BufferedReader(new FileReader("contacts.txt"));
        String line;
        while ((line = br.readLine()) != null) {
            String[] p = line.split("\\t");
            if (p.length == 2) { map.put(p[0], p[1]); map.put(p[1], p[0]); }
        }
        br.close();
        Scanner sc = new Scanner(System.in);
        String key = sc.nextLine();
        System.out.println(map.getOrDefault(key, "Record not found"));
        sc.close();
    }
}`
      },
      {
        filename: "contacts.txt",
        code: `Ravi\t9876543210
Asha\t9123456780
John\t9988776655`
      }
    ],
    compileCmd: "javac PhoneLookup.java",
    runCmd: "java PhoneLookup",
    sampleInput: "Ravi",
    sampleOutput: "9876543210",
    note: "Create contacts.txt in the same folder. Example line: Ravi<TAB>9876543210. Search using either the name or phone number.",
    result: "The program was executed and the output was verified.",
    viva: [
      "Why insert both map.put(p[0], p[1]) and map.put(p[1], p[0])? Allows bidirectional lookup (search by name OR phone number).",
      "What is the average lookup time of HashMap? O(1) constant time.",
      "Difference between HashMap and Hashtable? HashMap is unsynchronized and allows null keys/values; Hashtable is synchronized and legacy."
    ]
  },
  {
    id: 17,
    title: "Read Integers and Find Sum",
    category: "Files & I/O",
    aim: "Read a line of integers and display each integer and their sum.",
    files: [
      {
        filename: "IntegerSum.java",
        code: `import java.util.Scanner;

public class IntegerSum {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        String[] values = sc.nextLine().trim().split("\\s+");
        int sum = 0;
        for (String v : values) {
            int n = Integer.parseInt(v);
            System.out.println(n);
            sum += n;
        }
        System.out.println("Sum: " + sum);
        sc.close();
    }
}`
      }
    ],
    compileCmd: "javac IntegerSum.java",
    runCmd: "java IntegerSum",
    sampleInput: "10 20 30 40",
    sampleOutput: "10\n20\n30\n40\nSum: 100",
    note: "Enter all integers on one line separated by spaces.",
    result: "The program was executed and the output was verified.",
    viva: [
      "What does \\s+ match? One or more whitespace characters (spaces, tabs, newlines).",
      "What method parses a String to int? Integer.parseInt(str).",
      "Can we also use StringTokenizer? Yes, StringTokenizer is also commonly used for tokenizing in older syllabi."
    ]
  },
  {
    id: 18,
    title: "Word Frequency Count",
    category: "Collections",
    aim: "Write a Java program to count the frequency of each word in a given text.",
    files: [
      {
        filename: "WordFrequency.java",
        code: `import java.util.*;

public class WordFrequency {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        String text = sc.nextLine().toLowerCase().replaceAll("[^a-z0-9 ]", "");
        Map<String, Integer> count = new LinkedHashMap<>();
        for (String word : text.split("\\s+"))
            if (!word.isEmpty()) count.put(word, count.getOrDefault(word, 0) + 1);
        for (String word : count.keySet())
            System.out.println(word + ": " + count.get(word));
        sc.close();
    }
}`
      }
    ],
    compileCmd: "javac WordFrequency.java",
    runCmd: "java WordFrequency",
    sampleInput: "java is easy and java is powerful",
    sampleOutput: "java: 2\nis: 2\neasy: 1\nand: 1\npowerful: 1",
    note: "Punctuation is removed and words are counted without case sensitivity.",
    result: "The program was executed and the output was verified.",
    viva: [
      "Why use LinkedHashMap instead of HashMap? LinkedHashMap maintains insertion order of keys.",
      "What does getOrDefault(key, 0) do? Returns the mapped value if key exists, otherwise returns 0.",
      "What does [^a-z0-9 ] regex mean? Matches any character that is NOT lowercase letter, digit, or space."
    ]
  },
  {
    id: 19,
    title: "JDBC Database Connection and Queries",
    category: "Advanced Java",
    aim: "Establish a database connection and execute SQL queries using JDBC.",
    files: [
      {
        filename: "JDBCDemo.java",
        code: `import java.sql.*;

public class JDBCDemo {
    public static void main(String[] args) {
        String url = "jdbc:mysql://localhost:3306/college";
        String user = "root", password = "your_password";
        String sql = "SELECT id, name FROM student";
        try (Connection con = DriverManager.getConnection(url, user, password);
             Statement st = con.createStatement();
             ResultSet rs = st.executeQuery(sql)) {
            while (rs.next())
                System.out.println(rs.getInt("id") + " " + rs.getString("name"));
        } catch (SQLException e) {
            System.out.println(e.getMessage());
        }
    }
}`
      }
    ],
    compileCmd: "javac JDBCDemo.java",
    runCmd: "java -cp .:mysql-connector-j.jar JDBCDemo",
    sampleInput: "Database: college; Table: student(id, name)\nRows: (1, Asha), (2, Ravi)",
    sampleOutput: "1 Asha\n2 Ravi",
    note: "Install the MySQL JDBC driver, create the college database and student table, and replace the password. Add the connector JAR to the classpath.",
    result: "The program was executed and the output was verified.",
    viva: [
      "What are the 5 major steps in JDBC? 1. Load Driver, 2. Establish Connection, 3. Create Statement, 4. Execute Query, 5. Process ResultSet & Close.",
      "What is try-with-resources? Automatically closes resources implementing AutoCloseable (Connection, Statement, ResultSet).",
      "Difference between Statement and PreparedStatement? PreparedStatement is pre-compiled and prevents SQL injection."
    ]
  },
  {
    id: 20,
    title: "Hello World Servlet Using Tomcat",
    category: "Advanced Java",
    aim: "Install and configure Tomcat and deploy a simple Hello World servlet.",
    files: [
      {
        filename: "HelloServlet.java",
        code: `// HelloServlet.java
import java.io.*;
import jakarta.servlet.*;
import jakarta.servlet.http.*;
import jakarta.servlet.annotation.WebServlet;

@WebServlet("/hello")
public class HelloServlet extends HttpServlet {
    protected void doGet(HttpServletRequest req,
                         HttpServletResponse res) throws IOException {
        res.setContentType("text/html");
        PrintWriter out = res.getWriter();
        out.println("<h2>Hello World from Servlet</h2>");
    }
}`
      }
    ],
    compileCmd: "javac -cp servlet-api.jar HelloServlet.java",
    runCmd: "Deploy to Tomcat /webapps and access http://localhost:8080/YourApp/hello",
    sampleInput: "Open in browser: http://localhost:8080/YourApp/hello",
    sampleOutput: "Hello World from Servlet",
    note: "This example uses Jakarta Servlet imports (Tomcat 10+). Compile/deploy with the matching Servlet API and place the application under Tomcat webapps, or deploy a WAR.",
    result: "The program was executed and the output was verified.",
    viva: [
      "What is the life cycle of a Servlet? init() -> service() (calls doGet/doPost) -> destroy().",
      "Difference between javax.servlet and jakarta.servlet? Jakarta is the new package name used starting from Tomcat 10+ / Java EE 9+.",
      "What does @WebServlet(\"/hello\") annotation do? Maps the servlet class to the URL pattern /hello without requiring web.xml entry."
    ]
  }
];

if (typeof module !== 'undefined' && module.exports) {
  module.exports = EXPERIMENTS;
}

