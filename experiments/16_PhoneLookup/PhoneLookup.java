import java.io.*;
import java.util.*;

public class PhoneLookup {
    public static void main(String[] args) throws Exception {
        Map<String, String> map = new HashMap<>();
        BufferedReader br = new BufferedReader(new FileReader("contacts.txt"));
        String line;
        while ((line = br.readLine()) != null) {
            String[] p = line.split("\t");
            if (p.length == 2) { map.put(p[0], p[1]); map.put(p[1], p[0]); }
        }
        br.close();
        Scanner sc = new Scanner(System.in);
        String key = sc.nextLine();
        System.out.println(map.getOrDefault(key, "Record not found"));
        sc.close();
    }
}