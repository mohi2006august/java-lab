import java.util.Scanner;

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
}