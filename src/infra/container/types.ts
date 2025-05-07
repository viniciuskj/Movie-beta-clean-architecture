export const TYPES = {
    // Símbolos para repositórios
    MovieRepository: Symbol.for('MovieRepository'),
    
    // Símbolos para casos de uso
    GetAllMoviesUseCase: Symbol.for('GetAllMoviesUseCase'),
    GetMovieByIdUseCase: Symbol.for('GetMovieByIdUseCase'),
    CreateMovieUseCase: Symbol.for('CreateMovieUseCase'),
    UpdateMovieUseCase: Symbol.for('UpdateMovieUseCase'),
    DeleteMovieUseCase: Symbol.for('DeleteMovieUseCase'),
    
    // Símbolos para controladores
    MovieController: Symbol.for('MovieController')
  };
  