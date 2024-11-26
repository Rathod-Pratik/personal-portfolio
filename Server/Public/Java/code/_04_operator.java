public class _04_operator {
    public static void main(String[] args){
        int a=10;
        int b=20;

        System.out.println("\n1.Arithmetic operator");
        System.out.println("Additon :"+ (a+b));
        System.out.println("Substraction :"+ (a-b));
        System.out.println("multiplication :"+(a*b));
        System.out.println("division :"+(b/a));
        System.out.println("Modula :"+(a%b));

        int c=5;
        System.out.println("\n2.Assignment operator");
        System.out.println(c+=4);
        System.out.println(c-=5);
        System.out.println(c*=5);
        System.out.println(c/=5);
        System.out.println(c*=4);

        boolean d=false;
        System.out.println("\n3.Logical operator");
        System.out.println("AND :"+ (a<b && b<c));
        System.out.println("AND :"+ (a<b || b<c));
        System.out.println("NOT :"  + (!d));

        int e=5;
        boolean f=true;
        System.out.println("\n4.Unary operator");
        System.out.println(e++);
        System.out.println(++e);
        System.out.println(e--);
        System.out.println(--e);
        System.out.println(-(e));
        System.out.println(!(f));

        System.out.println("\n5.Relational operator");
        System.out.println(a<b);
        System.out.println(a>b);
        System.out.println(a==b);
        System.out.println(a<=b);
        System.out.println(a>=b);
        System.out.println(a!=b);

        System.out.println("\n6.Ternary operator");
        System.out.println(a<b?"Condition is true":"Condition is false");

    }
}
