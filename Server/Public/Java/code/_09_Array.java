 class Array {
    public static void main(String[] args) {
         // one dimensional array
         int[] numbers = {1, 2, 3, 4, 5};

         System.out.println("\n1. one dimensional array");
         for (int i = 0; i < numbers.length; i++) {
             System.out.println("Element at index " + i + ": " + numbers[i]);
         }

         //Rectangular Array 
         int[][] matrix = {
            {1, 2, 3},
            {4, 5, 6},
            {7, 8, 9}
        };

        System.out.println("\n2. Two dimensional array  ( Rectangular Array )");
        for(int i = 0; i < matrix.length; i++) {
            for (int j = 0; j < matrix[i].length; j++) {
                System.out.print(matrix[i][j] + " ");
            }
            System.out.println(); 
        }


        //Jagged array
        int[][] jaggedArray = {
            {1, 2},
            {3, 4, 5},
            {6, 7, 8, 9}
        };

        System.out.println("\n3. Jagged array");
        for (int i = 0; i < jaggedArray.length; i++) {
            for (int j = 0; j < jaggedArray[i].length; j++) {
                System.out.print(jaggedArray[i][j] + " ");
            }
            System.out.println(); 
        }
    }
}
