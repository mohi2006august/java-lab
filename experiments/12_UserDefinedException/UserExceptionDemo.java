import java.util.Scanner;

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
}