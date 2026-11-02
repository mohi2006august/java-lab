# ☕ Java Lab Manual & Fast Code Vault

> **Interactive Web App & Complete Source Code for All 20 Java Lab Experiments.**  
> Designed for quick copying, reference during lab sessions & internals, offline use, and viva preparation.

🌐 **Live Web Portal**: [https://mohi2006august.github.io/java-lab/](https://mohi2006august.github.io/java-lab/)

---

## ⚡ Features

- 📋 **One-Click Quick Copy**: Instant copy buttons for clean Java code, compile command (`javac`), run command (`java`), and sample inputs.
- 💾 **Direct `.java` Download**: Download any source code file with the exact required class name.
- 🚨 **Panic / Stealth Disguise Mode (`ESC`)**: One-touch screen disguise that instantly mimics official *Oracle Java SE 17 Documentation* if an invigilator or lab assistant walks by.
- 🔍 **Real-Time Search & Category Filters**: Search by experiment number, topic, keywords (`threads`, `scanner`, `matrix`, `exception`), or category.
- 🎓 **Viva Voce Cheat Sheet**: Common examiner questions and precise answers included for every experiment.
- ⌨️ **Keyboard Shortcuts**:
  - <kbd>ESC</kbd> - Toggle Oracle Disguise / Panic mode
  - <kbd>C</kbd> - Copy active experiment code
  - <kbd>D</kbd> - Download active `.java` file
  - <kbd>J</kbd> / <kbd>K</kbd> or <kbd>↓</kbd> / <kbd>↑</kbd> - Next / Previous experiment
  - <kbd>/</kbd> or <kbd>Ctrl</kbd> + <kbd>K</kbd> - Focus search bar
  - <kbd>T</kbd> - Toggle Dark / Light theme
- 📴 **100% Offline Ready**: Zero external CDN dependencies — works on offline lab machines with no internet.

---

## 📚 List of 20 Experiments

| # | Title | Category | Primary Class / File |
|---|---|---|---|
| **01** | [Command Line Arguments](experiments/01_CommandLineArgs/) | Basics | `StudentDetails.java` |
| **02** | [Prime Numbers up to N](experiments/02_PrimeNumbers/) | Basics | `PrimeNumbers.java` |
| **03** | [Fibonacci (Recursive & Non-Recursive)](experiments/03_Fibonacci/) | Basics | `Fibonacci.java` |
| **04** | [Employee Class Using Constructor and Method](experiments/04_EmployeeClass/) | OOP | `EmployeeDemo.java` |
| **05** | [Method and Constructor Overloading](experiments/05_Overloading/) | OOP | `OverloadDemo.java` |
| **06** | [Matrix Multiplication Using Objects](experiments/06_MatrixMultiplication/) | OOP | `MatrixMultiply.java` |
| **07** | [Types of Inheritance](experiments/07_InheritanceTypes/) | Inheritance | `InheritanceDemo.java` |
| **08** | [Method Overriding](experiments/08_MethodOverriding/) | Inheritance | `OverrideDemo.java` |
| **09** | [Abstract Class – Area of Shapes](experiments/09_AbstractClassShapes/) | Advanced OOP | `ShapeDemo.java` |
| **10** | [Creating and Importing Packages](experiments/10_Packages/) | Advanced OOP | `mypack/Message.java`, `PackageDemo.java` |
| **11** | [Handling Multiple Exceptions](experiments/11_MultipleExceptions/) | Exceptions | `MultipleExceptions.java` |
| **12** | [User Defined Exception](experiments/12_UserDefinedException/) | Exceptions | `UserExceptionDemo.java` |
| **13** | [Multithreading – Even Square & Odd Cube](experiments/13_Multithreading/) | Multithreading | `ThreadDemo.java` |
| **14** | [Producer–Consumer (Inter-Thread Communication)](experiments/14_ProducerConsumer/) | Multithreading | `ProducerConsumer.java` |
| **15** | [List Files in Directory & Subdirectories](experiments/15_ListFiles/) | Files & I/O | `ListFiles.java` |
| **16** | [Hash Table – Name and Phone Lookup](experiments/16_PhoneLookup/) | Collections | `PhoneLookup.java`, `contacts.txt` |
| **17** | [Read Integers and Find Sum](experiments/17_IntegerSum/) | Files & I/O | `IntegerSum.java` |
| **18** | [Word Frequency Count](experiments/18_WordFrequency/) | Collections | `WordFrequency.java` |
| **19** | [JDBC Database Connection and Queries](experiments/19_JDBC/) | Advanced Java | `JDBCDemo.java` |
| **20** | [Hello World Servlet Using Tomcat](experiments/20_Servlet/) | Advanced Java | `HelloServlet.java` |

---

## 🚀 How to Run the Website Locally

Simply clone or download this repo and open `index.html` in any web browser:

```bash
git clone https://github.com/mohi2006august/java-lab.git
cd java-lab
# Double-click index.html or run with python server:
python -m http.server 3000
```

---

## 🛠️ How to Compile & Run Programs in Lab

### General Java Execution:
```bash
# Compile
javac <ProgramName>.java

# Run
java <ProgramName> [optional_args]
```

### Experiment 10 (Packages):
```bash
# Compile package class with -d flag:
javac -d . mypack/Message.java PackageDemo.java
# Run:
java PackageDemo
```

### Experiment 16 (Hash Table / Contacts):
Place `contacts.txt` in the same directory:
```bash
javac PhoneLookup.java
java PhoneLookup
```

### Experiment 19 (JDBC):
```bash
javac JDBCDemo.java
java -cp .:mysql-connector-j-8.0.33.jar JDBCDemo
```

### Experiment 20 (Servlet):
```bash
javac -cp servlet-api.jar HelloServlet.java
# Deploy .class or WAR to Apache Tomcat /webapps
```

---

## 🌐 Enable GitHub Pages (To Access from Anywhere)

1. Go to your repository on GitHub: `https://github.com/mohi2006august/java-lab`
2. Click **Settings** > **Pages** (in the left sidebar).
3. Under **Branch**, select `main` (or `master`) and folder `/ (root)`.
4. Click **Save**.
5. Within 1–2 minutes, your website is live at:  
   👉 **`https://mohi2006august.github.io/java-lab/`**

---

Made with ❤️ for smooth Java lab sessions and exams.
