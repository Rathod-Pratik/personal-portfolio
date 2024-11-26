 class Loop{
    public static void main(String[] args) {
        int a;
        System.out.println("\n For loop");
        for(a=1; a<5; a++){
            System.out.println(a + " ");
        }

        System.out.println("\n While loop");
        int b=10;
        while(b!=5){
            System.out.println(b + " ");;
            --b;
        }

        System.out.println("\n Do while loop");
        int c=5;
        do { 
            System.out.println(c + " ");
            c++;
        } while (c<10);
    }
}
