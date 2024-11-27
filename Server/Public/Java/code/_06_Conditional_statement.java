import java.util.Scanner;
public class _11_Conditional_statement {
    public static void main(String[] args) {
        Scanner sc=new Scanner(System.in);
        System.out.println("Enter you age");
        int age= sc.nextInt();

        /*1. If statement*/
        if (age==20){
            System.out.println("Your age is 20");
        }

        /*2. If-else statement*/
        if(age>18){
            System.out.println("Yes, you can drive car");
        }
        else{
            System.out.println("No, you can't drive car");
        }

        /*3. If else ladder*/
        if(age==5){
            System.out.println("You are 5 years old");
        } else if (age==10) {
            System.out.println("You are 10 years old");
        } else if(age==20) {
            System.out.println("You are 20 years old");
        }else if(age==30) {
            System.out.println("You are 30 years old");
        }
        else{
            System.out.println("Information not found");
        }

        switch (age){
            case 10:
                System.out.println("You are chilld");
                break;
            case 20:
                System.out.println("You can do vote now");
                break;
            case 25:
                System.out.println("You can marray now");
                break;
            case 30:
                System.out.println("Your age is 30 now");
                break;
            default:
                System.out.println("Your task not found");
                break;

        }
    }
}
