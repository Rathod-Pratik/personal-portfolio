#include <iostream>
using namespace std;
int n = 5;

int BubbleSort(int array[]){
     for (int i = 0; i < n; i++)
    {
        for (int j = 0; j < n - i - 1; j++)
        {
            if (array[j] > array[j + 1])
            {
                int temp = array[j];
                array[j] = array[j + 1];
                array[j + 1] = temp;
            }
        }
    }
}

char print_Value(int array[]){
     for (int i = 0; i < n; i++)
    {
        cout << array[i] << " ";
    }
}
int main()
{
    int arr[n];

    cout << "Enter the Values" << endl;

    for (int i = 0; i < n; i++)
    {
        cin >> arr[i];
    }

    // Bubble sort
   BubbleSort(arr);

    // Print the value
   print_Value(arr);
    return 0;
}