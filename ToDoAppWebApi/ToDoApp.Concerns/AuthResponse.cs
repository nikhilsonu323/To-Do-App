namespace ToDoApp.Concerns
{
    public class AuthResponse
    {
        public required string Token { get; set; }

        public required double ExpiresIn { get; set; }
    }
}
