import java.util.Scanner;

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
}