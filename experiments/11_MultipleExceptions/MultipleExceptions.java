import java.util.Scanner;

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
}