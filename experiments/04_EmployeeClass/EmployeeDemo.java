import java.util.Scanner;

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
}