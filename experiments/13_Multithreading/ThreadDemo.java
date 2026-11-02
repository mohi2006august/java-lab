import java.util.Random;

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
}