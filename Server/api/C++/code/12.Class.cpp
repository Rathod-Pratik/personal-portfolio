#include<iostream>
#include<string>
using namespace std;
class data{
	private:
		int roll;
	public:
		string Name;
		string Course;
		
		int print(int r){
			roll=r;
			cout << "Your name is " << Name <<endl;
			cout << "Your course is " << Course <<endl;
			cout << "Your Roll Number is " << roll <<endl;
	}
};
int main(){
	data std1;
	
	std1.Name="Vatsal";
	std1.Course="BCA";
	
	std1.print(45);
}
