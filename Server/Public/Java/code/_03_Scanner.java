import java.util.Scanner;
public class _03_Scanner {
    public static void main(String[] args){
        Scanner sc=new Scanner(System.in);

        System.out.println("Enter the Value of a");
        int a= sc.nextInt();

        System.out.println("Enter the value of b");
        int b=sc.nextInt();

        System.out.println("Sum of the two value os :");
        System.out.println(a+b);
        sc.close();
}
}