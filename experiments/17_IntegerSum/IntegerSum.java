import java.util.Scanner;

public class IntegerSum {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        String[] values = sc.nextLine().trim().split("\s+");
        int sum = 0;
        for (String v : values) {
            int n = Integer.parseInt(v);
            System.out.println(n);
            sum += n;
        }
        System.out.println("Sum: " + sum);
        sc.close();
    }
}