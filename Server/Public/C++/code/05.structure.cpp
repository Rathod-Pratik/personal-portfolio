#include<iostream>
using namespace std;
struct data
{
    int RollNo;
    string Name;
};
int main(){
  data Student_1;
  Student_1.RollNo=12;
  Student_1.Name= "mohit chauhan";  

  cout << "Name : " << Student_1.Name<<endl; 
  cout << "Roll no : " << Student_1.RollNo<<endl; 
}