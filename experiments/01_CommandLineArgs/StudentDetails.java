public class StudentDetails {
    public static void main(String[] args) {
        if (args.length < 2) {
            System.out.println("Usage: java StudentDetails <name> <rollno>");
            return;
        }
        System.out.println("Student Name: " + args[0]);
        System.out.println("Roll Number: " + args[1]);
    }
}