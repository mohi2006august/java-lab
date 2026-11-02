class Buffer {
    int value;
    boolean available = false;
    synchronized void produce(int n) throws InterruptedException {
        while (available) wait();
        value = n; available = true;
        System.out.println("Produced: " + n);
        notifyAll();
    }
    synchronized void consume() throws InterruptedException {
        while (!available) wait();
        System.out.println("Consumed: " + value);
        available = false;
        notifyAll();
    }
}

public class ProducerConsumer {
    public static void main(String[] args) {
        Buffer b = new Buffer();
        Thread producer = new Thread(() -> {
            try { for (int i = 1; i <= 5; i++) b.produce(i); }
            catch (InterruptedException e) { Thread.currentThread().interrupt(); }
        });
        Thread consumer = new Thread(() -> {
            try { for (int i = 1; i <= 5; i++) b.consume(); }
            catch (InterruptedException e) { Thread.currentThread().interrupt(); }
        });
        producer.start(); consumer.start();
    }
}