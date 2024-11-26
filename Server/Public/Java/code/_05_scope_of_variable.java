 class myclass {
  static int static_variables=10;
  int instance_variable=30;

  //function use to print local variable
  public void local_variable(){
        static_variables=10;   //assign value of static variable
        int localVariable=20;  //local varialbe
        System.out.println("Local variable "+localVariable);
  }

  //function use to print static variable
  public void static_variable(){
      System.out.println("Static variable " + static_variables);
  }
  //funnction use to print intaince_varialbe
  public void instance_variable(){
    System.out.println("Instance_variable " + instance_variable);
  }
    public static void main(String[] args) {
      myclass obj=new myclass();
      obj.local_variable();  
      obj.static_variable();
      obj.instance_variable();
    }
}
