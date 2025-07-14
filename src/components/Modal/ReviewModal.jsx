import React, { useEffect } from 'react';
import { FaTimes, FaTrash } from 'react-icons/fa';
import Swal from 'sweetalert2';
import useReviews from '../../hooks/useReviews';
import Loading from '../Loading/Loading';

const ReviewModal = ({ item, onClose }) => {
    const { reviews, loading, error, getReviewsByMenuItem, deleteReview } = useReviews();

    useEffect(() => {
        if (item) {
            getReviewsByMenuItem(item.id);
        }
    }, [item, getReviewsByMenuItem]);

    const handleDeleteReview = (reviewId) => {
        Swal.fire({
            title: 'Anda yakin?',
            text: "Anda tidak akan dapat mengembalikan ulasan ini!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Ya, hapus!',
            cancelButtonText: 'Batal'
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    await deleteReview(reviewId);
                    getReviewsByMenuItem(item.id); // Re-fetch reviews after deletion
                    Swal.fire(
                        'Dihapus!',
                        'Ulasan telah dihapus.',
                        'success'
                    )
                } catch (error) {
                    console.error("Failed to delete review:", error);
                    Swal.fire(
                        'Gagal!',
                        'Gagal menghapus ulasan.',
                        'error'
                    )
                }
            }
        })
    };

    if (!item) return null;
    console.log("reviews", reviews);
    console.log("reviews", getReviewsByMenuItem);
    console.log("reviews", error);
    return (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-hidden">
                {/* Header */}
                <div className="flex justify-between items-center p-6 border-b border-green-100 bg-green-50">
                    <div>
                        <h3 className="text-xl font-bold text-green-800">Reviews</h3>
                        <p className="text-sm text-green-600 mt-1">{item.name}</p>
                    </div>
                    <button
                        onClick={onClose}
                        className="text-green-400 hover:text-green-600 hover:bg-white p-2 rounded-full transition-all duration-200"
                    >
                        <FaTimes size={18} />
                    </button>
                </div>

                {/* Content */}
                <div className="p-6 overflow-y-auto max-h-[calc(90vh-180px)]">
                    {loading ? (
                        <div className="flex justify-center py-8">
                            <Loading />
                        </div>
                    ) : error ? (
                        <div className="text-center py-8">
                            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                                <p className="text-red-600 font-medium">Oops! Something went wrong</p>
                                <p className="text-red-500 text-sm mt-1">{error.message || 'Could not fetch reviews.'}</p>
                            </div>
                        </div>
                    ) : reviews && reviews.data && reviews.data.length > 0 ? (
                        <div className="space-y-4">
                            {reviews.data.map((review, index) => (
                                <div key={review.id} className="bg-white rounded-lg p-4 border border-green-100 hover:shadow-lg hover:border-green-200 transition-all duration-200">
                                    <div className="flex justify-between items-start mb-2">
                                        <h4 className="font-semibold text-green-800">{review.customerName}</h4>
                                        <div className="flex items-center space-x-2">
                                            <div className="text-green-500 text-lg">
                                                {'★'.repeat(review.rating)}
                                                <span className="text-green-200">{'★'.repeat(5 - review.rating)}</span>
                                            </div>
                                            <button
                                                onClick={() => handleDeleteReview(review.id)}
                                                className="text-red-400 hover:text-red-600 p-1 rounded-full transition-colors duration-200"
                                                title="Delete Review"
                                            >
                                                <FaTrash size={14} />
                                            </button>
                                        </div>
                                    </div>
                                    <p className="text-gray-700 text-sm leading-relaxed">{review.comment}</p>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-12">
                            <div className="text-green-300 text-6xl mb-4">📝</div>
                            <p className="text-green-700 font-medium">No reviews yet</p>
                            <p className="text-green-500 text-sm mt-1">Be the first to share your thoughts!</p>
                        </div>
                    )}
                </div>

                {/* Footer */}
                <div className="p-6 border-t border-green-100 bg-green-50">
                    <div className="flex justify-end">
                        <button
                            onClick={onClose}
                            className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors duration-200 font-medium"
                        >
                            Close
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ReviewModal;