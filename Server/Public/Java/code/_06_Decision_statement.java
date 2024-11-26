
class Decision {

    public static void main(String[] args) {

        int number = 10;

        if (number > 0) {
            System.out.println("The number is positive.");
        }
        // if-else statement
        int number1 = -5;
        if (number1 > 0) {
            System.out.println("The number is positive.");
        } else {
            System.out.println("The number is not positive.");
        }

        //if-else-if ledder 
        int number2 = 0;

        if (number2 > 0) {
            System.out.println("The number is positive.");
        } else if (number2 < 0) {
            System.out.println("The number is negative.");
        } else {
            System.out.println("The number is zero.");
        }

        // Switch case statement
        String fruit = "Apple";

        switch (fruit) {
            case "Apple":
                System.out.println("It’s an apple.");
                break;
            case "Banana":
                System.out.println("It’s a banana.");
                break;
            default:
                System.out.println("Unknown fruit.");
                break;
        }
    }
}
