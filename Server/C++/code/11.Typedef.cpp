//this program use typedef as a pointer
#include<iostream>
using namespace std;
int main(){
	int a=15;
	int b=20;
	
	typedef int* point;
	
	point a1=&a;
	point b1=&b;
	
	cout <<"Value of a "<< *a1<<endl;
	cout <<"Value of b "<< *b1<<endl;
}
