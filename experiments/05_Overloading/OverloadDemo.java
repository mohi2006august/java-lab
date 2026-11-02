class Calculator {
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
}