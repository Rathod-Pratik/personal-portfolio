#include <iostream>
using namespace std;
int n = 5;
void Insertion_Sort(int array[])
{
    for (int i = 1;i< n; i++)
    {
        int key =array[i];
        int j = i - 1;

        while (j >= 0 && array[j] > key)
        {
            array[j + 1] = array[j];
            j = j - 1;
        }
        array[j + 1] = key;
    }
}

void print_Value(int array[])
{
    for (int i = 0; i < n; i++)
    {
        cout << array[i] << " ";
    }
}
int main()
{
    int arr[n];

    cout << "Enter Value " << endl;
    for (int i = 0; i < n; i++)
    {
        cin >> arr[i];
    }

    // Sort array
    Insertion_Sort(arr);

    // Print Value
    print_Value(arr);
    return 0;
}