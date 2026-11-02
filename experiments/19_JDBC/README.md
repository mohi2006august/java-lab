# Experiment 19: JDBC Database Connection and Queries

## Aim
Establish a database connection and execute SQL queries using JDBC.

## Compile Command
```bash
javac JDBCDemo.java
```

## Run Command
```bash
java -cp .:mysql-connector-j.jar JDBCDemo
```

## Sample Input
```
Database: college; Table: student(id, name)
Rows: (1, Asha), (2, Ravi)
```

## Sample Output
```
1 Asha
2 Ravi
```

## Note
Install the MySQL JDBC driver, create the college database and student table, and replace the password. Add the connector JAR to the classpath.

## Result
The program was executed and the output was verified.
