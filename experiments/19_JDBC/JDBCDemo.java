import java.sql.*;

public class JDBCDemo {
    public static void main(String[] args) {
        String url = "jdbc:mysql://localhost:3306/college";
        String user = "root", password = "your_password";
        String sql = "SELECT id, name FROM student";
        try (Connection con = DriverManager.getConnection(url, user, password);
             Statement st = con.createStatement();
             ResultSet rs = st.executeQuery(sql)) {
            while (rs.next())
                System.out.println(rs.getInt("id") + " " + rs.getString("name"));
        } catch (SQLException e) {
            System.out.println(e.getMessage());
        }
    }
}