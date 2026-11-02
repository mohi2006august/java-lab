import java.util.Scanner;

class Matrix {
    int[][] a = new int[10][10];
    int r, c;
    Matrix(int r, int c, Scanner sc) {
        this.r = r; this.c = c;
        for (int i = 0; i < r; i++)
            for (int j = 0; j < c; j++) a[i][j] = sc.nextInt();
    }
    Matrix multiply(Matrix b) {
        Matrix result = new Matrix(r, b.c);
        for (int i = 0; i < r; i++)
            for (int j = 0; j < b.c; j++)
                for (int k = 0; k < c; k++)
                    result.a[i][j] += a[i][k] * b.a[k][j];
        return result;
    }
    Matrix(int r, int c) { this.r = r; this.c = c; }
    void display() {
        for (int i = 0; i < r; i++) {
            for (int j = 0; j < c; j++) System.out.print(a[i][j] + " ");
            System.out.println();
        }
    }
}

public class MatrixMultiply {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int r1 = sc.nextInt(), c1 = sc.nextInt();
        Matrix x = new Matrix(r1, c1, sc);
        int r2 = sc.nextInt(), c2 = sc.nextInt();
        if (c1 != r2) { System.out.println("Multiplication not possible"); return; }
        Matrix y = new Matrix(r2, c2, sc);
        x.multiply(y).display();
        sc.close();
    }
}