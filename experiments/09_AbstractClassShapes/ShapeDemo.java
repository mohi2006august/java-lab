import java.util.Scanner;

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
}