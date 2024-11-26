class Jumping_statement {
    //return statement
    public static int add(int a, int b) {
        return a + b; // Returns the result of the addition
    }
    public static void main(String[] args) {
        //Break statement
        System.out.println("Break statement");
        for (int i = 0; i < 10; i++) {
            if (i == 5) {
                break; // Exits the loop when i is 5
            }
            System.out.println(i);
        }

        //Continue statement
        System.out.println("Continue statement");
        for (int i = 0; i < 10; i++) {
            if (i % 2 == 0) {
                continue; // Skips the rest of the loop body for even numbers
            }
            System.out.println(i);
        }

        //print return statement
        System.out.println("return statement");
        int result = add(5, 3);
        System.out.println("Result: " + result);
    }
}
