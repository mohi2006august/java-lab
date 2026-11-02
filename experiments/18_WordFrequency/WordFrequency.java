import java.util.*;

public class WordFrequency {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        String text = sc.nextLine().toLowerCase().replaceAll("[^a-z0-9 ]", "");
        Map<String, Integer> count = new LinkedHashMap<>();
        for (String word : text.split("\s+"))
            if (!word.isEmpty()) count.put(word, count.getOrDefault(word, 0) + 1);
        for (String word : count.keySet())
            System.out.println(word + ": " + count.get(word));
        sc.close();
    }
}