class String_method {
    public static void main(String[] args) {
    String Name="Rathod";

        /*Length function */
        System.out.println("1.Length function");
        int value =Name.length();
        System.out.println(value);

        /*ToLoverCase function*/
        System.out.println("2.ToLoverCase function");
        String Lstring=Name.toLowerCase();
        System.out.println(Lstring);

        /*toUpperCase function*/
        System.out.println("3.toUpperCase function");
        String Ustring=Name.toUpperCase();
        System.out.println(Ustring);

        /*Trim function*/
        System.out.println("4.Trim function");
        String NotTrim="    Mohit     ";
        System.out.println(NotTrim);
        System.out.println(NotTrim.trim());

        /*substring function*/
        System.out.println("5.substring function");
        System.out.println(Name.substring(2));
        System.out.println(Name.substring(2,4));

        /*replace function*/
        System.out.println("6.replace function");
        System.out.println(Name.replace("Rathod","Pratik"));
        System.out.println(Name.replace('R','K'));

        /*StartWith function*/
        System.out.println("7.StartWith and endsWith function");
        System.out.println(Name.startsWith("Ra"));
        System.out.println(Name.endsWith("od"));

        /*charAt function*/
        System.out.println("8.charAt function");
        System.out.println(Name.charAt(3));

        /*Indexof function*/
        System.out.println("9.indexof function");
        System.out.println(Name.indexOf('o'));

        /*Equal function*/
        System.out.println("10.Equal function");
        System.out.println(Name.equals("rathod"));
        System.out.println(Name.equalsIgnoreCase("rathod"));

        /*Escape sequences*/
        System.out.println("11.Escape sequences");
        System.out.println("I'm escape sequence \n \"  \' \\ \t ");

    }
}
