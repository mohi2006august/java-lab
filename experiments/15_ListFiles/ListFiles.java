import java.io.File;
import java.util.Scanner;

public class ListFiles {
    static void list(File dir) {
        File[] files = dir.listFiles();
        if (files == null) return;
        for (File f : files) {
            System.out.println(f.getPath());
            if (f.isDirectory()) list(f);
        }
    }
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        list(new File(sc.nextLine()));
        sc.close();
    }
}